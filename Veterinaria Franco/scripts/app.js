const app = Vue.createApp({
    data() {
        return {
           productos:[],
           productosFarmaceuticos:[],
           juguetes:[],
           favoritos:[]
        }
    },
    created() {
        let endpoint =`https://apipetshop.herokuapp.com/api/articulos`;
        
        fetch(endpoint)
            .then(res => res.json(console.log(res)))
            .then(json => {
                this.productos = json.response;
                console.log(this.productos)

                this.separarProductos()
            })
            .catch(err => console.error(err.message))
    },
    methods:{
        separarProductos(){
            this.productos.forEach(producto => {
                if(producto.nombre) {producto.tipo=="Juguete"? this.juguetes.push(producto): this.productosFarmaceuticos.push(producto)}
            });
        console.log(this.juguetes)
        console.log(this.productosFarmaceuticos)
        this.quedanPocos(this.juguetes)
        this.quedanPocos(this.productosFarmaceuticos)
        },
        quedanPocos(array){
          array.forEach(producto => producto.stock<=5? producto.quedanPocos=true : producto.quedanPocos=false)  
        },
        formularioEnviado(){
            alert("su formulario fué enviado satisfactoriamente")
        },
        toggleFavorito(elemento){
            elemento.esFavorito = !elemento.esFavorito
        }
    },
    computed:{
        productosFavoritos(){
            this.favoritos= this.productos.filter(producto => producto.esFavorito)
            console.log(this.favoritos)
            return this.favoritos;
        }
    }
});
app.mount("#app")