window.addEventListener('DOMContentLoaded', () => {
    let page = 0;
    let maxPages;

    const messagesBox = document.querySelector('.MessagesBox');

    class Message {
        constructor(id, nickname, email, text, updatedAt, createdAt) {
            this.id = id;
            this.nickname = nickname;
            this.email = email;
            this.text = text;
            this.updatedAt = updatedAt;
            this.createdAt = createdAt;
        }

        render() {
            const element = document.createElement('div');

            element.classList.add('Message');

            element.innerHTML = `
                <div class="nickname">
                     ${this.nickname} <font class="email">(${this.email})</font>
                </div>
                <div class="messageContent">
                    ${this.text}
                </div>
                <div class="messageDate">
                    <div class="InfoDate left">
                        Sent at:<font class="dateFont">${this.createdAt}</font>
                    </div>
                    <div class="InfoDate">
                        Updated at:<font class="dateFont">${this.updatedAt}</font>
                    </div>
                    <a href="/messages/${this.id}"><button id="edit" data-id=${this.id}>Edit</button></a>
                </div>
            `;

            messagesBox.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const calculatePagesCount = (msgCount) => parseInt(msgCount / 10);

    getResource('/api/messages/list/' + page)
    .then(({data: {messages, count}}) => {
        maxPages = calculatePagesCount(count);

        messages.forEach(({_id, authorName, authorEmail, messageText, updatedAt, createdAt}) => {
            new Message(_id, authorName, authorEmail, messageText, updatedAt, createdAt).render();
        });
    });

    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');

    prevButton.addEventListener('click', () => {
        if (page === 0) {
            alert('First page!');
        } else {
            const messageDivs = document.querySelectorAll('.Message');

            messageDivs.forEach(div => {
                div.remove();
            });

            page--;

            getResource('/api/messages/list/' + page)
            .then(({data: {messages}}) => {
                messages.forEach(({_id, authorName, authorEmail, messageText, updatedAt, createdAt}) => {
                    new Message(_id, authorName, authorEmail, messageText, updatedAt, createdAt).render();
                });
            });
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (page === maxPages) {
            alert('Last page!');
        } else {
            const messageDivs = document.querySelectorAll('.Message');

            messageDivs.forEach(div => {
                div.remove();
            });

            page++;
            
            getResource('/api/messages/list/' + page)
            .then(({data: {messages}}) => {
                messages.forEach(({_id, authorName, authorEmail, messageText, updatedAt, createdAt}) => {
                    new Message(_id, authorName, authorEmail, messageText, updatedAt, createdAt).render();
                });
            });
        }
    });

    const form = document.querySelector('form');

    const postMessage = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data 
        });

        return await res.json();
    };

    const bindPostData = (form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = new FormData(form);
            const formData = Object.fromEntries(data.entries());

            if (formData.nickname.length === 0 || formData.nickname.length >= 20 || /\s/.test(formData.nickname)) {
                alert('Wrong nickname!');
            } else if (!/^([a-zA-z]|\d)+@[a-zA-Z]+\.[a-zA-z]+$/i.test(formData.email)) {
                alert('Wrong email!');
            } else if (formData.message.trim().length === 0 || formData.message.length > 100) {
                alert('Wrong message!');
            } else {
                postMessage('/api/messages', JSON.stringify(formData))
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    form.reset();
                });
            }
        });
    };

    bindPostData(form);
});