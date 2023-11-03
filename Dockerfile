# Gunakan image Nginx yang ringan sebagai dasar
FROM nginx:alpine

# Hapus konfigurasi default Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Salin berkas-berkas HTML, CSS, dan JavaScript Anda ke direktori root Nginx
COPY ./ /usr/share/nginx/html
