# Installe cette bibliothèque avec: pip install python-telegram-bot
import logging
# Ajout de WebAppInfo pour lancer la Mini App
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Configure le logging pour voir les erreurs
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# --- CONFIGURATION ---
# 1. Remplace par le VRAI token de ton bot (obtenu via @BotFather)
BOT_TOKEN = "8558464961:AAF5cH6hpx1th4KS6fCu6ItlrfQLpzMGR4I" 

# 2. Remplace par le CHEMIN vers ton logo (l'image doit être dans le même dossier)
LOGO_ACCUEIL = "LogoTele.jpg" 

# 3. Remplace par l'URL DE TA MINI APP (ton lien GitHub Pages)
MINI_APP_URL = "https://miniapp47.github.io/BackPackBot2/"


# --- Fonction pour la commande /start ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Répond à la commande /start avec un logo et un bouton pour la Mini App."""
    user = update.effective_user
    logger.info(f"Commande /start reçue de {user.username or user.first_name}")

    # 1. Prépare le texte de bienvenue
    welcome_text = (
        f"Salut {user.mention_html()} 👋\n\n"
        "Bienvenue sur la mini-app !\n\n"
        "Clique sur le bouton ci-dessous pour ouvrir l'application."
    )

    # 2. Prépare le bouton unique pour la Mini App
    keyboard = [
        [InlineKeyboardButton("🎒 Ouvrir le Shop", web_app=WebAppInfo(url=MINI_APP_URL))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # 3. Envoie la photo (ton logo) AVEC le texte et le bouton
    try:
        # On utilise reply_photo pour envoyer une image
        await update.message.reply_photo(
            photo=LOGO_ACCUEIL,
            caption=welcome_text,
            reply_markup=reply_markup,
            parse_mode='HTML' # On garde le mode HTML pour le "mention_html"
        )
        logger.info(f"Message d'accueil (avec logo) envoyé à {user.username or user.first_name}")
    except Exception as e:
        logger.error(f"Erreur en envoyant le logo d'accueil : {e}")
        # Envoie un message de secours si la photo ne marche pas
        await update.message.reply_text(
            f"Bienvenue {user.mention_html()} !\n\n"
            "Clique ci-dessous pour ouvrir le shop (le logo n'a pas pu charger).",
            reply_markup=reply_markup,
            parse_mode='HTML'
        )


# --- Fonction principale pour lancer le bot ---
def main() -> None:
    """Lance le bot."""
    # Crée l'application et passe le token
    application = Application.builder().token(BOT_TOKEN).build()

    # Ajoute le gestionnaire pour la commande /start
    application.add_handler(CommandHandler("start", start))

    logger.info("Le bot démarre...")
    # Lance le bot jusqu'à ce que l'utilisateur appuie sur Ctrl+C
    application.run_polling()
    logger.info("Le bot s'est arrêté.")

if __name__ == '__main__':
    main()