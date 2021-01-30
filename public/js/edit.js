window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    const editMessage = async (url, data) => {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: data 
        });

        return await res.json();
    };

    const bindEditData = (form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = new FormData(form);
            const formData = Object.fromEntries(data.entries());
            formData.id = document.querySelector('.nickname').getAttribute('data-id');

            if (formData.nickname.length === 0 || formData.nickname.length >= 20 || /\s/.test(formData.nickname)) {
                alert('Wrong nickname!');
            } else if (!/^([a-zA-z]|\d)+@[a-zA-Z]+\.[a-zA-z]+$/i.test(formData.email)) {
                alert('Wrong email!');
            } else if (formData.message.trim().length === 0 || formData.message.length > 100) {
                alert('Wrong message!');
            } else {
                editMessage('/api/messages', JSON.stringify(formData))
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    form.reset();
                    window.location.replace("/");
                });
            }
        });
    };

    bindEditData(form);
});