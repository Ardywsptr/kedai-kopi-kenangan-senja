document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [{
            id: 1,
            name: 'Robusta Brazil',
            img: '1.jfif',
            price: '20000',
        }, {
            id: 2,
            name: 'Arabica Blend',
            img: '2.jfif',
            price: '25000',
        }, {
            id: 3,
            name: 'Primo Passo',
            img: '3.jfif',
            price: '30000',
        }, {
            id: 4,
            name: 'Aceh Gayo',
            img: '4.jfif',
            price: '35000',
        }, {
            id: 5,
            name: 'Sumatra Mandheling',
            img: '5.jfif',
            price: '40000',
        }, ],
    }))

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find(item => item.id === newItem.id);

            // jika belum ada / cart kosong
            if (!cartItem) {
                this.items.push({
                    ...newItem,
                    quantity: 1,
                    total: parseInt(newItem.price)
                });
                this.quantity++;
                this.total += parseInt(newItem.price);
            } else {
                // jika barang dalam cart sudah ada, cek apakah item barang tersebut sama atau berbeda
                this.items = this.items.map(item => {
                    // jika barang sama
                    if (item.id === newItem.id) {
                        item.quantity++;
                        item.total = item.quantity * parseInt(item.price);
                        this.quantity++;
                        this.total += parseInt(item.price);
                        return item;
                    } else {
                        // jika barang berbeda
                        return item;
                    }
                })
            }
        },
        remove(id) {
            // ambil item yang ingin di remove berdasarkan id
            const cartItem = this.items.find(item => item.id === id);

            // jika item lebih dari 1
            if (cartItem.quantity > 1) {
                // cek satu per satu
                this.items = this.items.map((item) => {
                    // jika item yang di klik
                    if (item.id === id) {
                        item.quantity--;
                        item.total = item.quantity * parseInt(item.price);
                        this.quantity--;
                        this.total -= parseInt(item.price);
                        return item;
                    } else {
                        // jika bukan item yang di klik
                        return item;
                    }
                })
                // jika item sisa 1
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter(item => item.id !== id);
                this.quantity--;
                this.total -= parseInt(cartItem.price);
            }
        }
    })
})


// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number)
}