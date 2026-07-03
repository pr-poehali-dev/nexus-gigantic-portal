import json
import os
import re
import smtplib
from email.mime.text import MIMEText
from email.header import Header

EMAIL_RE = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
TELEGRAM_RE = re.compile(r'^@?[a-zA-Z0-9_]{5,32}$')


def handler(event: dict, context) -> dict:
    '''
    Business: Принимает заявку с лендинга Nexus Media, валидирует Email и Telegram, отправляет уведомление на корпоративную почту.
    Args: event - dict с httpMethod, body (JSON: email, telegram); context - объект с request_id.
    Returns: HTTP-ответ со статусом отправки заявки.
    '''
    method = event.get('httpMethod', 'POST')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        data = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Некорректный формат запроса'}),
        }

    email = (data.get('email') or '').strip()
    telegram = (data.get('telegram') or '').strip()

    errors = {}
    if not EMAIL_RE.match(email):
        errors['email'] = 'Укажите корректный корпоративный Email'
    if not TELEGRAM_RE.match(telegram):
        errors['telegram'] = 'Укажите Telegram в формате @username (от 5 символов)'

    if errors:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'errors': errors}, ensure_ascii=False),
        }

    tg_normalized = telegram if telegram.startswith('@') else '@' + telegram

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    email_to = os.environ.get('LEAD_EMAIL_TO', smtp_user)

    body_text = (
        'Новая заявка на интеграцию с сайта Nexus Media\n\n'
        f'Корпоративный Email: {email}\n'
        f'Telegram: {tg_normalized}\n'
    )

    msg = MIMEText(body_text, 'plain', 'utf-8')
    msg['Subject'] = Header('Новая заявка — Nexus Media', 'utf-8')
    msg['From'] = smtp_user
    msg['To'] = email_to

    if smtp_port == 465:
        server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=20)
    else:
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=20)
        server.starttls()
    server.login(smtp_user, smtp_password)
    server.sendmail(smtp_user, [email_to], msg.as_string())
    server.quit()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}, ensure_ascii=False),
    }
