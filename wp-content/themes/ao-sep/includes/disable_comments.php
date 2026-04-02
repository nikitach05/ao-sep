<?php
// Полное отключение комментариев во всем WordPress
add_action('init', 'disable_comments_globally');

function disable_comments_globally() {
    // Закрываем комментарии для всех типов записей
    add_filter('comments_open', '__return_false', 20, 2);
    add_filter('pings_open', '__return_false', 20, 2);

    // Скрываем существующие комментарии
    add_filter('comments_array', '__return_empty_array', 10, 2);

    // Отключаем поддержку комментариев и трекбэков для всех типов записей
    $post_types = get_post_types();
    foreach ($post_types as $post_type) {
        if (post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
}

// Убираем пункт "Комментарии" из админ-бара и меню
add_action('wp_before_admin_bar_render', 'remove_comments_admin_bar');
function remove_comments_admin_bar() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}

// Убираем страницу "Комментарии" из админ-панели
add_action('admin_menu', 'remove_comments_admin_menu');
function remove_comments_admin_menu() {
    remove_menu_page('edit-comments.php');
}

// Перенаправляем запросы к wp-comments-post.php на главную страницу
add_action('template_redirect', 'redirect_comments_post_requests');
function redirect_comments_post_requests() {
    if (is_comment_feed() || (isset($_SERVER['SCRIPT_NAME']) && strpos($_SERVER['SCRIPT_NAME'], 'wp-comments-post.php') !== false)) {
        wp_redirect(home_url());
        exit;
    }
}