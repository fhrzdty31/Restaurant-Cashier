import toRupiah from '@develoka/angka-rupiah-js'

export const LOCAL_API_URL = 'http://localhost:8080/'

// export const API_URL = 'https://my-json-server.typicode.com/fhrzdty31/Restaurant-Cashier'

export const rupiah = (value) => toRupiah(value)