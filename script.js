function todoApp() {
    return {
        darkMode: localStorage.getItem('darkMode') === 'true',
        dyslexie: localStorage.getItem('dyslexie') === 'true',
        taches: JSON.parse(localStorage.getItem('taches')) || [],
        nouvelleTache: '',

        changerTheme() {

            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');

        },

        changerLecture() {
            this.dyslexie = !this.dyslexie;
            localStorage.setItem('dyslexie', this.dyslexie ? 'true' : 'false');
        },

        ajouterTache() {
            if (this.nouvelleTache.trim() === '') {
                return;
            }
            this.taches.push({
                id: Date.now(),
                texte: this.nouvelleTache,
                terminee: false
            });
            this.nouvelleTache = '';
            this.sauvegarderTaches();
        },

        supprimerTache(id) {
            this.taches = this.taches.filter(tache => tache.id !== id);
            this.sauvegarderTaches();
        },

        sauvegarderTaches() {
            localStorage.setItem('taches', JSON.stringify(this.taches));
        },

        total() {
            return this.taches.length;
        },
        
        terminees() {
            return this.taches.filter(tache => tache.terminee).length;
        },

        restantes() {
            return this.taches.length - this.terminees();
        }
    }
}

function setCookie(name, value, days){
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name){
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let morceaux = cookies[i].split("=");
        if (morceaux[0] === name) {
            return morceaux[1];
        }
    }
    return null;
}

function deleteCookie(name){
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}