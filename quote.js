document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("show");

            if (navbar.classList.contains("show")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }

        });


        document.querySelectorAll(".navbar a").forEach(function (link) {

            link.addEventListener("click", function () {
                navbar.classList.remove("show");
                menuToggle.textContent = "☰";
            });

        });

    }


    /* =========================
       QUOTES DATABASE
    ========================= */

    const quotes = [

        {
            text: "The future depends on what you do today.",
            author: "Mahatma Gandhi"
        },

        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },

        {
            text: "It always seems impossible until it's done.",
            author: "Nelson Mandela"
        },

        {
            text: "Success is the sum of small efforts, repeated day in and day out.",
            author: "Robert Collier"
        },

        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },

        {
            text: "Don't watch the clock; do what it does. Keep going.",
            author: "Sam Levenson"
        },

        {
            text: "Great things are done by a series of small things brought together.",
            author: "Vincent van Gogh"
        },

        {
            text: "The secret of getting ahead is getting started.",
            author: "Mark Twain"
        },

        {
            text: "Your limitation—it's only your imagination.",
            author: "Unknown"
        },

        {
            text: "Dream big and dare to fail.",
            author: "Norman Vaughan"
        }

    ];


    /* =========================
       GET RANDOM QUOTE
    ========================= */

    function getRandomQuote() {

        return quotes[
            Math.floor(Math.random() * quotes.length)
        ];

    }


    /* =========================
       DAILY / QUOTE PAGE
    ========================= */

    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const newQuote = document.getElementById("newQuote");


    function displayQuote() {

        const quote = getRandomQuote();

        if (quoteText) {
            quoteText.textContent = quote.text;
        }

        if (quoteAuthor) {
            quoteAuthor.textContent = "— " + quote.author;
        }

        localStorage.setItem(
            "currentQuote",
            JSON.stringify(quote)
        );

    }


    if (newQuote) {

        newQuote.addEventListener(
            "click",
            displayQuote
        );

    }


    /* =========================
       HOME QUOTE
    ========================= */

    const homeQuote = document.getElementById("homeQuote");
    const homeAuthor = document.getElementById("homeAuthor");
    const homeRefresh = document.getElementById("homeRefresh");


    function displayHomeQuote() {

        const quote = getRandomQuote();

        if (homeQuote) {
            homeQuote.textContent = quote.text;
        }

        if (homeAuthor) {
            homeAuthor.textContent = "— " + quote.author;
        }

    }


    if (homeRefresh) {

        homeRefresh.addEventListener(
            "click",
            displayHomeQuote
        );

    }


    /* =========================
       COPY QUOTE
    ========================= */

    const copyQuote =
        document.getElementById("copyQuote");


    if (copyQuote) {

        copyQuote.addEventListener("click", async function () {

            const text =
                quoteText.textContent +
                " " +
                quoteAuthor.textContent;

            try {

                await navigator.clipboard.writeText(text);

                copyQuote.textContent = "✓ Copied!";

                setTimeout(function () {
                    copyQuote.textContent = "⧉ Copy";
                }, 1500);

            } catch (error) {

                alert("Unable to copy the quote.");

            }

        });

    }


    /* =========================
       SHARE QUOTE
    ========================= */

    const shareQuote =
        document.getElementById("shareQuote");


    if (shareQuote) {

        shareQuote.addEventListener("click", async function () {

            const text =
                quoteText.textContent +
                " " +
                quoteAuthor.textContent;

            if (navigator.share) {

                try {

                    await navigator.share({
                        title: "Motiva Quote",
                        text: text
                    });

                } catch (error) {
                    // User cancelled sharing
                }

            } else {

                try {

                    await navigator.clipboard.writeText(text);

                    shareQuote.textContent = "✓ Copied!";

                    setTimeout(function () {
                        shareQuote.textContent = "↗ Share";
                    }, 1500);

                } catch (error) {

                    alert(text);

                }

            }

        });

    }


    /* =========================
       FAVORITE QUOTE
    ========================= */

    const favoriteQuote =
        document.getElementById("favoriteQuote");


    if (favoriteQuote) {

        favoriteQuote.addEventListener("click", function () {

            const quote = {
                text: quoteText.textContent,
                author: quoteAuthor.textContent
            };


            let favorites =
                JSON.parse(
                    localStorage.getItem("favorites")
                ) || [];


            const exists = favorites.some(
                item => item.text === quote.text
            );


            if (!exists) {

                favorites.push(quote);

                localStorage.setItem(
                    "favorites",
                    JSON.stringify(favorites)
                );

                favoriteQuote.textContent =
                    "♥ Saved";

            } else {

                favoriteQuote.textContent =
                    "♥ Already Saved";

            }

        });

    }


});