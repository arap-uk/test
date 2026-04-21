const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbyjvuEm6Trv1SokGDrPUQK9dPJoDnzlTVvORxTYB9mgnomGcxdJgLadFSwGaz6EoDesoA/exec"; 

const translations = {
    en: {
        dir: "ltr",
        title: "Official Immigration Panel",
        login_header: "User Login",
        user_placeholder: "User Name",
        email_placeholder: "Email Address",
        pass_placeholder: "Password",
        case_placeholder: "Case Number",
        login_btn: "Login to Panel",
        err_userName: "❌ User not found",
        err_email: "❌ Email does not match",
        err_password: "❌ Incorrect password",
        err_caseNumber: "❌ Invalid case number",
        empty_fields: "Please fill all fields.",
        loading_msg: "Welcome! Redirecting...",
        server_error: "Connection error! Check your VPN or script permissions.",
        f1_h: "Immigration Lawyers", f1_a1: "Australia Lawyers", f1_a2: "UK Lawyers", f1_a3: "Schengen Lawyers",
        f2_h: "Electronic Contract", f2_a1: "New Contract", f2_a2: "Free Lawyer", f2_a3: "Track Request",
        f3_h: "Contact Us", f3_a1: "Email", f3_a2: "WhatsApp", f3_a3: "Telegram"
    },
    fa: {
        dir: "rtl",
        title: "پنل رسمی مهاجرتی",
        login_header: "ورود به پنل کاربری",
        user_placeholder: "نام کاربری",
        email_placeholder: "ایمیل",
        pass_placeholder: "رمز عبور",
        case_placeholder: "شماره کیس",
        login_btn: "ورود به پنل",
        err_userName: "❌ نام کاربری یافت نشد",
        err_email: "❌ ایمیل مطابقت ندارد",
        err_password: "❌ رمز عبور نادرست است",
        err_caseNumber: "❌ شماره کیس نامعتبر است",
        empty_fields: "لطفاً تمام فیلدها را پر کنید.",
        loading_msg: "خوش آمدید! در حال انتقال...",
        server_error: "خطا در ارتباط! فیلترشکن را چک کنید.",
        f1_h: "وکلای مهاجرتی", f1_a1: "وکلای استرالیا", f1_a2: "وکلای انگلستان", f1_a3: "وکلای شینگن",
        f2_h: "قرارداد الکترونیکی", f2_a1: "قرارداد جدید", f2_a2: "وکیل رایگان", f2_a3: "پیگیری درخواست",
        f3_h: "ارتباط با ما", f3_a1: "ایمیل", f3_a2: "واتساپ", f3_a3: "تلگرام"
    },
    it: {
        dir: "ltr",
        title: "Panel Ufficiale Immigrazione",
        login_header: "Accesso Utente",
        user_placeholder: "Nome Utente",
        email_placeholder: "Indirizzo Email",
        pass_placeholder: "Password",
        case_placeholder: "Numero Pratica",
        login_btn: "Accedi al Pannello",
        err_userName: "❌ Utente non trovato",
        err_email: "❌ Email non corrispondente",
        err_password: "❌ Password errata",
        err_caseNumber: "❌ Numero pratica non valido",
        empty_fields: "Per favore, compila tutti i campi.",
        loading_msg: "Benvenuto! Reindirizzamento...",
        server_error: "Errore di connessione! Controlla la VPN.",
        f1_h: "Avvocati d'Immigrazione", f1_a1: "Avvocati Australia", f1_a2: "Avvocati UK", f1_a3: "Avvocati Schengen",
        f2_h: "Contratto Elettronico", f2_a1: "Nuovo Contratto", f2_a2: "Avvocato Gratuito", f2_a3: "Segui Richiesta",
        f3_h: "Contattaci", f3_a1: "Email", f3_a2: "WhatsApp", f3_a3: "Telegram"
    }
};

let currentLang = 'en';

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    
    // Update Texts
    document.getElementById('txt_title').innerText = t.title;
    document.getElementById('txt_login_header').innerText = t.login_header;
    document.getElementById('userName').placeholder = t.user_placeholder;
    document.getElementById('email').placeholder = t.email_placeholder;
    document.getElementById('password').placeholder = t.pass_placeholder;
    document.getElementById('caseNumber').placeholder = t.case_placeholder;
    document.getElementById('loginBtn').innerText = t.login_btn;
    
    // Update Errors
    document.getElementById('err_userName').innerText = t.err_userName;
    document.getElementById('err_email').innerText = t.err_email;
    document.getElementById('err_password').innerText = t.err_password;
    document.getElementById('err_caseNumber').innerText = t.err_caseNumber;

    // Footer
    document.getElementById('txt_footer_1_h').innerText = t.f1_h;
    document.getElementById('txt_footer_1_a1').innerText = t.f1_a1;
    document.getElementById('txt_footer_1_a2').innerText = t.f1_a2;
    document.getElementById('txt_footer_1_a3').innerText = t.f1_a3;
    document.getElementById('txt_footer_2_h').innerText = t.f2_h;
    document.getElementById('txt_footer_2_a1').innerText = t.f2_a1;
    document.getElementById('txt_footer_2_a2').innerText = t.f2_a2;
    document.getElementById('txt_footer_2_a3').innerText = t.f2_a3;
    document.getElementById('txt_footer_3_h').innerText = t.f3_h;
    document.getElementById('txt_footer_3_a1').innerText = t.f3_a1;
    document.getElementById('txt_footer_3_a2').innerText = t.f3_a2;
    document.getElementById('txt_footer_3_a3').innerText = t.f3_a3;
}

document.getElementById('loginBtn').addEventListener('click', function() {
    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const caseNumber = document.getElementById('caseNumber').value.trim();

    if (!userName || !email || !password || !caseNumber) {
        alert(translations[currentLang].empty_fields);
        return;
    }

    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    const url = `${GOOGLE_API_URL}?user=${encodeURIComponent(userName)}&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password)}&case=${encodeURIComponent(caseNumber)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            loading.style.display = 'none';
            if (data.success) {
                resetStyles();
                alert(translations[currentLang].loading_msg);
                window.location.href = "panel.html"; 
            } else {
                handleErrors(data.errors);
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            alert(translations[currentLang].server_error);
        });
});

function handleErrors(errors) {
    resetStyles();
    if (errors && errors.length > 0) {
        errors.forEach(id => {
            const fieldId = id === 'password' ? 'password' : id; 
            const el = document.getElementById(fieldId);
            const errMsg = document.getElementById('err_' + fieldId);
            if (el) el.classList.add('invalid');
            if (errMsg) errMsg.style.display = 'block';
        });
    }
}

function resetStyles() {
    ['userName', 'email', 'password', 'caseNumber'].forEach(id => {
        const el = document.getElementById(id);
        const err = document.getElementById('err_' + id);
        if (el) el.classList.remove('invalid');
        if (err) err.style.display = 'none';
    });
}

// Set initial language to English
window.onload = () => changeLanguage('en');