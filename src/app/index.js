import Vue from 'vue';
import App from './components/App.vue';
new Vue({
    render: renderizador => renderizador(App)
}).$mount('#app');