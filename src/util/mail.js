import fetch from 'node-fetch'
import { URLSearchParams } from 'url'

const token = process.env.MAILGUN_TOKEN
const host = process.env.HOST || `http://localhost:${process.env.PORT || 3000}`

let mailgunEndpoint

function getMailgunEndpoint() {
  if (!token) {
    throw new Error('MAILGUN_TOKEN env variable not set!')
  }

  if (!mailgunEndpoint) {
    mailgunEndpoint = `https://api:${token}@api.mailgun.net/v3/mail.thestandup.app`
  }

  return mailgunEndpoint
}

function sendEmail(to, subject, body) {
  const params = new URLSearchParams()
  params.append('from', 'no-reply@mail.thestandup.app')
  params.append('to', to)
  params.append('subject', subject)
  params.append('text', body)

  return fetch(`${getMailgunEndpoint()}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
}

function sendRegistrationEmail(to, username, token) {
  const body = `
    Hi there 👋 ${to},

    You've registered on the Standup App. Here's a link to login for ${username}:

    ${host}?token=${token}

    Salutations,
    The Standup App team
`

  const subject = 'Standup App Registration and Verification Code'

  return sendEmail(to, subject, body)
}

function sendLoginEmail(to, token) {
  const body = `
    Hi there 👋 ${to},

    You've requested a login for the Standup App. Here's a link to login:

    ${host}?token=${token}

    Salutations,
    The Standup App team
`

  const subject = 'Standup App Verification Code'

  return sendEmail(to, subject, body)
}

export default {
  sendLoginEmail,
  sendRegistrationEmail,
}

export { sendLoginEmail, sendRegistrationEmail }
