// Attend que le DOM soit entièrement chargé pour exécuter le script
document.addEventListener('DOMContentLoaded', function () {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#2c2c2e');
    tg.setBackgroundColor('#1c1c1d');

    // --- CONFIGURATION DES LIENS DE CONTACT ---
    const contactLinks = [
        { name: 'Instagram', url: 'https://www.instagram.com/back_packstash?igsh=NDRhZjA2MzJrbWh0', className: 'instagram', text: "Instagram", icon: '#icon-instagram', id: 'instagram' },
        { name: 'Potato', url: 'https://dympt.org/joinchat/HoX_FfMZTJjNwyaFPa2EFw', icon: '#icon-potato', id: 'potato', className: 'potato', text: "Potato" }
    ];

    // --- DONNÉES DE L'APPLICATION (NOUVELLE STRUCTURE) ---
    const appData = [
        // --- Catégorie 1: Mousseux Cake ---
        {
            id: 'EXTRACTION',
            name: 'Exctraction',
            farm: '',
            type: 'Hash',
            quality: 'Exctraction',
            image: 'CategExt.png', // Image de la catégorie

            // La catégorie contient maintenant des "farms"
            farms: [
                {
                    id: 'FROSTYHASH',
                    name: 'Frosty Hash',
                    image: 'FrostyFarm.JPG', // Mets une image de farm si tu veux
                    products: [
                        {
                            id: 'Papaya',
                            name: 'Papaya',
                            farm: 'Frosty Hash',
                            type: 'Hash',
                            image: 'Neujeu3.png',
                            video: 'VideoNeujeu1.mp4',
                            description: 'Type d\'exctraction \n Wpff-120u',
                            tarifs: [
                                { weight: '1g', price: 80.00 },
                                { weight: '2g', price: 150.00 },
                            ]
                        },/* changer la police,  page acceuil sur tele , potato redirect, image categ,     */
                        {
                            id: 'Bluezushi',
                            name: 'Blue zushi',
                            farm: 'Frosty Hash',
                            type: 'Hash',
                            image: 'Neujeu4.png',
                            video: 'VideoNejeu2.mp4',
                            description: 'Type d\'exctraction \n Wpff-120u',
                            tarifs: [
                                { weight: '1g', price: 80.00 },
                                { weight: '2g', price: 150.00 },
                            ]
                        },
                        {
                            id: 'Watermelon Tourmaline',
                            name: 'Watermelon Tourmaline',
                            farm: 'Frosty Hash',
                            type: 'Hash',
                            image: 'Nejeu1.jpeg',
                            video: 'MousseauStar.mp4',
                            description: 'Type d\'exctraction \n Live rosin 70-120u',
                            tarifs: [
                                { weight: '1g', price: 250.00 },
                                { weight: '2g', price: 500.00 },
                            ]
                        },
                        {
                            id: 'GakPak',
                            name: 'GakPak',
                            farm: 'Frosty Hash',
                            type: 'Hash',
                            image: 'Nejeu1.jpeg',
                            video: 'MousseauStar.mp4',
                            description: 'Type d\'exctraction \n Live rosin 70-120u',
                            tarifs: [
                                { weight: '1g', price: 250.00 },
                                { weight: '2g', price: 500.00 },
                            ]
                        },
                        {
                            id: 'Zkittlez',
                            name: 'Zkittlez',
                            farm: 'Frosty Hash',
                            type: 'Hash',
                            image: 'Nejeu1.jpeg',
                            video: 'MousseauStar.mp4',
                            description: 'Type d\'exctraction \n Live rosin 70-120u',
                            tarifs: [
                                { weight: '1g', price: 250.00 },
                                { weight: '2g', price: 500.00 },
                            ]
                        }
                    ]
                }

            ]
        },

        // --- Catégorie 2: V.V.S TANGER ---
        {
            id: 'FLEURS',
            name: 'Fleurs',
            farm: '',
            type: 'Weed',
            quality: 'Fleurs',
            image: 'CategFleurs.png', // Image de la catégorie

            farms: [
                {
                    id: 'WIZARDTREES', // J'ai inventé un ID de farm
                    name: 'Wizard Trees',
                    image: 'WizardFarm.JPG', // Mets une image de farm si tu veux
                    products: [
                        {
                            id: 'ZangBanger',
                            name: 'Zand Banger',
                            farm: 'Wizard trees',
                            type: 'Weed',
                            image: 'Zang.png',
                            video: 'VideoCali2.mp4',
                            description: 'Ultra rare - 27.33% THC \n ( Sherbanger #22 x Zangria )',
                            tarifs: [
                                { weight: '3,5g', price: 130.00 },
                                { weight: '7g', price: 250.00 },
                                { weight: '10,5g', price: 350.00 },
                            ]
                        },
                        {
                            id: 'Potion',
                            name: 'Potion',
                            farm: 'Wizard trees',
                            type: 'Weed',
                            image: 'Cali2.png',
                            video: 'VideoCali1.mp4',
                            description: 'Batch 09/09/2025 \n ( Limelight x Blackmagic )',
                            tarifs: [
                                { weight: '3,5g', price: 130.00 },
                                { weight: '7g', price: 250.00 },
                                { weight: '10,5g', price: 350.00 },
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    // --- VARIABLES D'ÉTAT ---
    let cart = [];
    let currentFilters = {
        searchTerm: '',
        quality: 'all',
        farm: 'all'
    };
    let currentView = 'categories'; // 'categories', 'farms', ou 'products'
    let currentCategoryId = null; // Garde en mémoire la catégorie sélectionnée
    let currentFarmId = null; // Garde en mémoire la farm sélectionnée


    // --- SÉLECTEURS D'ÉLÉMENTS DU DOM ---
    const pages = document.querySelectorAll('.page');
    const productListContainer = document.getElementById('product-list');
    const loaderPage = document.getElementById('page-loader');

    const filterContainer = document.querySelector('.filters');

    // --- NOUVEAUX SÉLECTEURS POUR CHAQUE FILTRE ---
    const searchFilterWrapper = document.getElementById('search-filter').parentElement;
    const qualityFilterWrapper = document.getElementById('quality-filter').parentElement;
    const farmFilterWrapper = document.getElementById('farm-filter').parentElement;
    // --- FIN NOUVEAUX SÉLECTEURS ---

    // --- HELPER : TROUVER UN PRODUIT PAR SON ID ---
    function getProductById(productId) {
        for (const category of appData) {
            // Boucle dans les farms de chaque catégorie
            for (const farm of category.farms) {
                const product = farm.products.find(p => p.id === productId);
                if (product) {
                    return product;
                }
            }
        }
        return undefined; // Non trouvé
    }

    // --- NAVIGATION ---
    function showPage(pageId) {
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    }

    // --- LOGIQUE D'AFFICHAGE ---

    // --- MODIFIÉ : renderHomePage ---

 function renderHomePage() {
    // Toujours afficher le conteneur principal des filtres
    filterContainer.style.display = 'flex';

    // On enlève les anciens boutons "retour"
    const existingBackBtnCat = filterContainer.querySelector('.back-to-categories-btn');
    if (existingBackBtnCat) existingBackBtnCat.remove();
    const existingBackBtnFarm = filterContainer.querySelector('.back-to-farms-btn');
    if (existingBackBtnFarm) existingBackBtnFarm.remove();


    if (currentView === 'categories') {
        renderCategoryList();
        
        // --- GESTION DES FILTRES (Vue Catégorie) ---
        searchFilterWrapper.style.display = 'none';
        farmFilterWrapper.style.display = 'none';
        qualityFilterWrapper.style.display = 'flex'; // On montre QUE la qualité

        // --- GESTION DU STYLE DE GRILLE ---
        productListContainer.style.gridTemplateColumns = 'repeat(1, 1fr)';

    } else if (currentView === 'farms') {
        renderFarmList(currentCategoryId);

        // --- GESTION DES FILTRES (Vue Farms) ---
        searchFilterWrapper.style.display = 'none';
        farmFilterWrapper.style.display = 'none'; // Pas de filtres pour les farms
        qualityFilterWrapper.style.display = 'none';

        // --- GESTION DU STYLE DE GRILLE ---
        productListContainer.style.gridTemplateColumns = 'repeat(1, 1fr)'; // 1 colonne pour les farms

        // --- AJOUT BOUTON RETOUR (vers Catégories) ---
        const category = appData.find(c => c.id === currentCategoryId);
        const backButton = document.createElement('button');
        backButton.className = 'back-to-categories-btn'; // CLASSE IMPORTANTE
        backButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg> ${category.name}`;
        backButton.style.cssText = `background: var(--tertiary-bg-color); border: none; color: white; padding: 10px 15px; border-radius: 10px; font-size: 1.1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; width: 100%; box-sizing: border-box; margin-top: 3vh;`;
        filterContainer.prepend(backButton);

    } else if (currentView === 'products') {
        renderProductList(currentCategoryId, currentFarmId);

        // --- GESTION DES FILTRES (Vue Produit) ---
        searchFilterWrapper.style.display = 'flex'; 
        farmFilterWrapper.style.display = 'flex'; // On montre les filtres produits
        qualityFilterWrapper.style.display = 'none'; // On cache la qualité
        
        // --- GESTION DU STYLE DE GRILLE ---
        productListContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'; // 2 colonnes

        // --- AJOUT BOUTON RETOUR (vers Farms) ---
        const category = appData.find(c => c.id === currentCategoryId);
        const farm = category.farms.find(f => f.id === currentFarmId);
        const backButton = document.createElement('button');
        backButton.className = 'back-to-farms-btn'; // CLASSE IMPORTANTE
        backButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg> ${farm.name}`;
        backButton.style.cssText = `background: var(--tertiary-bg-color); border: none; color: white; padding: 10px 15px; border-radius: 10px; font-size: 1.1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; width: 100%; box-sizing: border-box; margin-top: 3vh;`;
        filterContainer.prepend(backButton);
    }
}

    // --- MODIFIÉ : renderCategoryList ---
    // Prend en compte le filtre qualité
    function renderCategoryList() {
        const filteredCategories = appData.filter(category => {
            const searchMatch = category.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase());
            // --- AJOUT ---
            const qualityMatch = currentFilters.quality === 'all' || category.quality === currentFilters.quality;
            return searchMatch && qualityMatch;
            // --- FIN AJOUT ---
        });

        productListContainer.innerHTML = '';
        if (filteredCategories.length === 0) {
            productListContainer.innerHTML = '<p class="no-results">Aucune catégorie ne correspond à votre recherche.</p>';
            return;
        }

        filteredCategories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.dataset.categoryId = category.id;

            card.innerHTML = `
                <img src="${category.image}" alt="${category.name}">
              
            `;
            productListContainer.appendChild(card);
        });
    }

    // --- NOUVELLE FONCTION ---
    // Affiche la liste des FARMS pour une catégorie
    function renderFarmList(categoryId) {
        const category = appData.find(c => c.id === categoryId);
        if (!category) {
            productListContainer.innerHTML = '<p class="no-results">Catégorie non trouvée.</p>';
            return;
        }

        const farms = category.farms; // Pas de filtres ici pour l'instant
        
        productListContainer.innerHTML = '';
        if (farms.length === 0) {
            productListContainer.innerHTML = '<p class="no-results">Aucune farm trouvée pour cette catégorie.</p>';
            return;
        }
        
        farms.forEach(farm => {
            const card = document.createElement('div');
            card.className = 'farm-card'; // NOUVELLE CLASSE
            card.dataset.farmId = farm.id; // DATASET IMPORTANT
            
            card.innerHTML = `
                <img src="${farm.image}" alt="${farm.name}">
            `;
            productListContainer.appendChild(card);
        });
    }

   // Affiche la liste des PRODUITS pour une farm
   function renderProductList(categoryId, farmId) {
    const category = appData.find(c => c.id === categoryId);
    if (!category) {
        productListContainer.innerHTML = '<p class="no-results">Catégorie non trouvée.</p>';
        return;
    }
    const farm = category.farms.find(f => f.id === farmId);
    if (!farm) {
        productListContainer.innerHTML = '<p class="no-results">Farm non trouvée.</p>';
        return;
    }

    const filteredProducts = farm.products.filter(product => {
        const searchMatch = product.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase());
        const qualityMatch = currentFilters.quality === 'all' || product.quality === currentFilters.quality;
        const farmMatch = currentFilters.farm === 'all' || product.farm === currentFilters.farm;
        
        return searchMatch && qualityMatch && farmMatch;
    });
    
    productListContainer.innerHTML = '';
    if (filteredProducts.length === 0) {
        productListContainer.innerHTML = '<p class="no-results">Aucun produit ne correspond à votre recherche.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card product-item-card';
        card.dataset.productId = product.id; 
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="info">
                <div class="name">${product.name}</div>
                <div class="farm">${product.farm}</div>
                <div class="price">${product.tarifs[0].price.toFixed(2)}€</div>
            </div>
        `;
        productListContainer.appendChild(card);
    });
}


    // Affiche la page de détail d'un produit
    function renderProductPage(productId) {
        // On utilise notre nouvelle fonction "helper"
        const product = getProductById(productId);
        if (!product) return;

        const videoElement = document.querySelector('#page-product .product-video');
        videoElement.src = product.video;
        videoElement.poster = product.image;

        document.getElementById('product-page-title').innerText = product.name;
        const detailsContainer = document.getElementById('product-details-content');

        let tarifsHTML = product.tarifs.map(tarif => `
        <div class="tarif-item">
            <div class="box-tarif">
                <div class="tarif-wieght">${tarif.weight}</div>
                <div class="tarif-price">${tarif.price.toFixed(2)}€</div>
            </div>
            <button class="add-to-cart-btn" data-product-id="${product.id}" data-weight="${tarif.weight}" data-price="${tarif.price}">
                <svg width="20" height="20"><use href="#icon-cart"/></svg>
            </button>
        </div>
    `).join('');

        // --- NOUVEAU BLOC DE CODE ---
        // On prépare le HTML pour la description, seulement si elle existe
        let descriptionHTML = '';
        if (product.description) {
            // On remplace les sauts de ligne \n par des <br> pour l'HTML
            const formattedDescription = product.description.replace(/\n/g, '<br>');
            descriptionHTML = `<p class="product-description">${formattedDescription}</p>`;
        }
        // --- FIN DU NOUVEAU BLOC ---

        // On injecte le HTML, y compris la description
        detailsContainer.innerHTML = `
        <div class="name">${product.name}</div>
        <div class="farm">${product.farm}</div>
        ${descriptionHTML} <h4 class="tarifs-title">💰 Tarifs disponibles :</h4>
        ${tarifsHTML}
    `;
        showPage('page-product');
    }

    // Met à jour l'affichage du panier (inchangé)
    function renderCart() {
        const cartContainer = document.getElementById('cart-items-container');
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
            document.getElementById('cart-total-price').innerText = '0.00€';
            updateCartCount();
            return;
        }

        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div class="name">${item.name}</div>
                    <div>${item.weight} - ${item.unitPrice.toFixed(2)}€</div>
                    <div class="price">${item.totalPrice.toFixed(2)}€</div>
                </div>
                <div class="quantity-selector">
                    <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        document.getElementById('cart-total-price').innerText = `${total.toFixed(2)}€`;
        updateCartCount();
    }

    // Affiche la page de confirmation (inchangé)
    function renderConfirmation() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

        document.getElementById('confirmation-items-count').innerText = `${totalItems} article${totalItems > 1 ? 's' : ''}`;
        document.getElementById('confirmation-total-price').innerText = `${totalPrice.toFixed(2)}€`;

        const itemsList = document.getElementById('confirmation-items-list');
        itemsList.innerHTML = cart.map((item, index) => `
             <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div>${index + 1}. ${item.name}</div>
                    <div>Quantité: ${item.quantity}x ${item.weight}</div>
                    <div>Prix unitaire: ${item.unitPrice.toFixed(2)}€</div>
                </div>
            </div>
        `).join('');

        document.getElementById('confirmation-final-price').innerText = `${totalPrice.toFixed(2)}€`;
        showPage('page-confirmation');
    }

    // Affiche la page de contact (inchangé)
    function renderContactPage() {
        const linksContainer = document.getElementById('contact-links-container');
        linksContainer.innerHTML = contactLinks.map(link => `
        <a href="${link.url}" class="contact-link ${link.className}" target="_blank">
        <svg width="24" height="24"><use href="${link.icon}"/></svg>
            <span>${link.text}</span>
        </a>
        `).join('');
    }

    // Met à jour le compteur du panier (inchangé)
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.innerText = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    // --- MODIFIÉ : populateFilters ---
    // Prend les données des catégories ET des produits
    function populateFilters() {
        const searchFilter = document.getElementById('search-filter');
        const qualityFilter = document.getElementById('quality-filter');
        const farmFilter = document.getElementById('farm-filter');

        const allNestedProducts = appData.flatMap(category => category.farms.flatMap(farm => farm.products));

        // --- MODIFICATION ---
        const categoryQualities = appData.map(c => c.quality);
        const productQualities = allNestedProducts.map(p => p.quality);
        const qualities = ['all', ...new Set([...categoryQualities, ...productQualities])];

        const categoryFarms = appData.map(c => c.farm);
        const productFarms = allNestedProducts.map(p => p.farm);
        const farms = ['all', ...new Set([...categoryFarms, ...productFarms])];
        // --- FIN MODIFICATION ---

        qualityFilter.innerHTML = qualities.map(q => `<option value="${q}">${q === 'all' ? 'LES SELECTION DU CHEF' : q}</option>`).join('');
        farmFilter.innerHTML = farms.map(farm => `<option value="${farm}">${farm === 'all' ? 'Les farms' : farm}</option>`).join('');

        searchFilter.addEventListener('input', (e) => {
            currentFilters.searchTerm = e.target.value;
            renderHomePage();
        });

        qualityFilter.addEventListener('change', (e) => {
            currentFilters.quality = e.target.value;
            renderHomePage();
        });

        farmFilter.addEventListener('change', (e) => {
            currentFilters.farm = e.target.value;
            renderHomePage();
        });
    }

    // --- NOTIFICATION (inchangé) ---
    let notificationTimeout;
    function showNotification(message) {
        const notification = document.getElementById('notification-toast');
        if (!notification) return;

        clearTimeout(notificationTimeout);
        notification.classList.remove('show');
        void notification.offsetWidth;

        notification.innerText = message;
        notification.classList.add('show');

        notificationTimeout = setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // --- LOGIQUE DU PANIER ---

    function addToCart(productId, weight, price) {
        const cartItemId = `${productId}-${weight}`;
        const existingItem = cart.find(item => item.id === cartItemId);

        const product = getProductById(productId);

        if (existingItem) {
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
        } else {
            cart.push({
                id: cartItemId,
                productId: productId,
                name: product.name,
                image: product.image,
                weight: weight,
                quantity: 1,
                unitPrice: price,
                totalPrice: price
            });
        }
        renderCart();
        tg.HapticFeedback.notificationOccurred('success');
        showNotification('✅ Produit ajouté au panier !');
    }

    // updateQuantity (inchangé)
    function updateQuantity(cartItemId, action) {
        const item = cart.find(i => i.id === cartItemId);
        if (!item) return;

        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity--;
        }

        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== cartItemId);
        } else {
            item.totalPrice = item.quantity * item.unitPrice;
        }
        renderCart();
    }

    // --- FORMATAGE DU MESSAGE DE COMMANDE (inchangé) ---
    function formatOrderMessage() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        const date = new Date();
        const formattedDate = `${date.getDate()} ${date.toLocaleString('fr-FR', { month: 'long' })} ${date.getFullYear()} a ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;


        let message = "NOUVELLE COMMANDE\n\n";
        message += "====================\n";
        message += "RESUME:\n";
        message += `- ${totalItems} article${totalItems > 1 ? 's' : ''} commande\n`;
        message += `- Total: ${totalPrice.toFixed(2)}e \n`;
        message += "====================\n";
        message += `DETAIL DES ARTICLES:\n`;

        cart.forEach((item) => {
            message += `\n- ${item.id}`;
            message += `\n  Quantite: ${item.quantity}x ${item.weight}`;
            message += `\n  Prix unitaire: ${item.unitPrice.toFixed(2)}e`;
            message += `\n  Sous-total: ${item.totalPrice.toFixed(2)} EUR`;
        });

        message += `\n\nTOTAL FINAL: ${totalPrice.toFixed(2)} EUR`;
        message += " \n-LIVRAISON: A convenir\n";
        message += " \n-CONTACT: Merci de confirmer cette commande\n";
        message += ` \n-Commande passee le: ${formattedDate}\n`;
        return message;
    }


    // --- GESTION DES ÉVÉNEMENTS ---

    // Clics sur la barre de navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            if (!pageId) return;

            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            if (pageId === 'page-contact') {
                renderContactPage();
            }

            if (pageId === 'page-home') {
                currentView = 'categories';
                currentCategoryId = null;
                // On reset TOUS les filtres
                currentFilters.searchTerm = '';
                currentFilters.quality = 'all';
                currentFilters.farm = 'all';
                document.getElementById('search-filter').value = '';
                document.getElementById('quality-filter').value = 'all';
                document.getElementById('farm-filter').value = 'all';

                renderHomePage();
            }

            showPage(pageId);
        });
    });

    // Clics sur le reste de la page
   document.body.addEventListener('click', function(e) {
    const target = e.target;

    // 1. Clic sur une carte CATÉGORIE
    const categoryCard = target.closest('.category-card');
    if (categoryCard) {
        currentView = 'farms'; // On va à la vue "farms"
        currentCategoryId = categoryCard.dataset.categoryId;
        // On reset les filtres
        currentFilters.searchTerm = '';
        document.getElementById('search-filter').value = '';
        renderHomePage();
        return;
    }

    // 2. NOUVEAU : Clic sur une carte FARM
    const farmCard = target.closest('.farm-card');
    if (farmCard) {
        currentView = 'products'; // On va à la vue "products"
        currentFarmId = farmCard.dataset.farmId;
        // On reset les filtres
        currentFilters.searchTerm = '';
        document.getElementById('search-filter').value = '';
        renderHomePage();
        return;
    }

    // 3. Clic sur une carte PRODUIT
    const productCard = target.closest('.product-item-card');
    if (productCard) {
        renderProductPage(productCard.dataset.productId);
        return;
    }

    // 4. NOUVEAU : Clic sur le bouton "Retour" (vers Catégories)
    if (target.closest('.back-to-categories-btn')) {
        currentView = 'categories';
        currentCategoryId = null;
        currentFilters.searchTerm = ''; 
        document.getElementById('search-filter').value = '';
        renderHomePage();
        return;
    }

    // 5. NOUVEAU : Clic sur le bouton "Retour" (vers Farms)
    if (target.closest('.back-to-farms-btn')) {
        currentView = 'farms';
        currentFarmId = null;
        currentFilters.searchTerm = ''; 
        document.getElementById('search-filter').value = '';
        renderHomePage();
        return;
    }

    // --- Reste de la logique de clic (panier, etc.) ---

    // Clic sur "Ajouter au panier"
    if (target.closest('.add-to-cart-btn')) {
        const btn = target.closest('.add-to-cart-btn');
        addToCart(btn.dataset.productId, btn.dataset.weight, parseFloat(btn.dataset.price));
    }
    
    // Clic sur les boutons de quantité
    if (target.closest('.quantity-btn')) {
        const btn = target.closest('.quantity-btn');
        updateQuantity(btn.dataset.id, btn.dataset.action);
    }
    
    // Clic sur le bouton "fermer"
    if (target.closest('.close-button')) {
        showPage('page-home');
        document.querySelector('#nav-menu').classList.add('active');
        document.querySelector('#nav-contact').classList.remove('active');
    }

    // Clic sur "Continuer les achats"
    if (target.closest('#cart-continue-shopping')) {
        showPage('page-home');
        document.querySelector('#nav-menu').classList.add('active');
        document.querySelector('#nav-contact').classList.remove('active');
    }
    
    // Clic sur les boutons "retour" (des pages produits, panier...)
    if (target.closest('.back-button')) {
        showPage('page-home');
        document.querySelector('#nav-menu').classList.add('active');
        document.querySelector('#nav-contact').classList.remove('active');
    }
    
    // Clic sur le bouton du panier
    if (target.closest('#home-cart-button')) {
        renderCart();
        showPage('page-cart');
    }
    
    // Clic sur "Commander"
    if (target.closest('#checkout-button')) {
        renderConfirmation();
    }
    
    // Clic sur "Modifier"
    if (target.closest('#confirmation-modify-order')) {
        showPage('page-cart');
    }
    
    // Clic sur "Confirmer la commande"
    if (target.closest('#confirm-order-button')) {
        const targetUsername = 'plugsBotOfficiel';
        let message = formatOrderMessage();
        message = message.replace(/\*/g, ''); 
        const encodedMessage = encodeURIComponent(message);
        const telegramUrl = `https:t.me/${targetUsername}?text=${encodedMessage}`;
        tg.openLink(telegramUrl);
    }
});

    // --- INITIALISATION DE L'APP ---
    function init() {
        setTimeout(() => {
            populateFilters();
            renderHomePage(); // Affiche les catégories au début
            updateCartCount();
            showPage('page-home');
        }, 1500);
    }

    init();
});