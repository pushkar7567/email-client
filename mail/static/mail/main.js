document.addEventListener('DOMContentLoaded', function() {
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load('sent'));
  document.querySelector('#archived').addEventListener('click', () => load('archive'));
  document.querySelector('#compose').addEventListener('click', () => compose());
  // By default, load the inbox
  load('inbox');
})

function compose() {
    document.querySelector('form').onsubmit = function() {
        const recipients = document.querySelector('#compose-recipients').value;
        const subject = document.querySelector('#compose-subject').value;
        const body = document.querySelector('#compose-body').value;

        fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({
                recipients: recipients,
                subject: subject,
                body: body
            })
        })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
            alert(result.message);
        });
        document.querySelector('#compose-recipients').value = '';
        document.querySelector('#compose-subject').value = '';
        document.querySelector('#compose-body').value = '';
        return false;
    }
}

function load(mailbox) {
    fetch('/emails/'+mailbox)
    .then(response => response.json())
    .then(emails => {
        console.log(emails);
    });
}