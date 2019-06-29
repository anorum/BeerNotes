from flask_mail import Mail, Message

# python -m smtpd -n -c DebuggingServer localhost:8025

mail = Mail()


def send_email(subject, sender, recipients, text_body, html_body, **kwargs):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    mail.send(msg)
