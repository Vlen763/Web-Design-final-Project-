// ===== MOBILE MENU TOGGLE =====
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.getElementById('mainNav');
        const links = mainNav.querySelectorAll('a');

        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Change icon
            const icon = mobileBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // ===== HERO SLIDER =====
        let slides = document.querySelectorAll('.hero-slider .slide');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        // ===== MENU TAB FILTER =====
        const menuTabs = document.querySelectorAll('.menu-tab');
        const menuItems = document.querySelectorAll('.menu-item');

        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                menuTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.dataset.category;
                menuItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // ===== ADD TO ORDER BUTTONS =====
        const addToOrderBtns = document.querySelectorAll('.add-to-order');
        let orderCount = 0;

        addToOrderBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                orderCount++;
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                this.style.background = '#4CAF50';
                this.style.color = 'white';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
                
                // Show notification
                alert('Item added to your order!');
            });
        });

        // ===== GALLERY FILTER =====
        const galleryFilters = document.querySelectorAll('.gallery-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                galleryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                const category = filter.dataset.filter;
                galleryItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // ===== BOOKING FORM MODAL =====
        const bookingFormContainer = document.getElementById('bookingForm');
        const bookRestaurantBtn = document.querySelector('.book-restaurant-btn');
        const bookCafeBtn = document.querySelector('.book-cafe-btn');
        const bookEventBtn = document.querySelector('.book-event-btn');
        const closeFormBtn = document.getElementById('closeFormBtn');
        const cancelBookingBtn = document.getElementById('cancelBookingBtn');
        const reservationForm = document.getElementById('reservationForm');
        const bookingSuccess = document.getElementById('bookingSuccess');
        const newBookingBtn = document.getElementById('newBookingBtn');

        [bookRestaurantBtn, bookCafeBtn, bookEventBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                reservationForm.style.display = 'block';
                bookingSuccess.style.display = 'none';
                bookingFormContainer.style.display = 'block';
                bookingFormContainer.classList.add('active');
                
                // Scroll to form
                bookingFormContainer.scrollIntoView({ behavior: 'smooth' });
            });
        });

        [closeFormBtn, cancelBookingBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                bookingFormContainer.classList.remove('active');
                setTimeout(() => {
                    bookingFormContainer.style.display = 'none';
                }, 300);
                reservationForm.reset();
                bookingSuccess.style.display = 'none';
            });
        });

        // Submit booking form
        reservationForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('customerName').value;
            const phone = document.getElementById('customerPhone').value;
            const guests = document.getElementById('guestCount').value;
            const date = document.getElementById('bookingDate').value;
            const time = document.getElementById('bookingTime').value;
            
            // Simple validation
            const khmerPhone = /^(0\d{8,9}|\+855\d{8,9})$/;
            if (!khmerPhone.test(phone)) {
                alert('Please enter a valid Cambodian phone number (0xx or +855 format).');
                return;
            }
            
            if (!name || !guests || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }
            
            reservationForm.style.display = 'none';
            bookingSuccess.style.display = 'block';
        });

        // Make another booking
        newBookingBtn.addEventListener('click', () => {
            reservationForm.reset();
            reservationForm.style.display = 'block';
            bookingSuccess.style.display = 'none';
        });

        // ===== BACK TO TOP BUTTON =====
        const backToTopBtn = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ===== HEADER SCROLL EFFECT =====
        const mainHeader = document.getElementById('mainHeader');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });

        // ===== SET MINIMUM DATE FOR BOOKING =====
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        document.getElementById('bookingDate').min = formattedDate;
        document.getElementById('bookingDate').value = formattedDate;

        // ===== NEWSLETTER SUBSCRIPTION =====
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value;
                
                if (email) {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                }
            });
        }