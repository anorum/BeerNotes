from flask_mail import Mail, Message
import boto3
from botocore.exceptions import ClientError

# python -m smtpd -n -c DebuggingServer localhost:8025

AWS_REGION = "us-west-2"
CHARSET = "UTF-8"
client = boto3.client('ses', region_name=AWS_REGION)


mail = Mail()


def send_email(subject, sender, recipients, text_body, html_body, **kwargs):
    try:
        # Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    recipients,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': html_body,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': text_body,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': subject,
                },
            },
            Source=sender,
        )
        # Display an error if something goes wrong.
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
