<?php
// Load Composer's autoloader
require_once( ABSPATH . 'vendor/autoload.php' );

require_once( 'includes/constants.php' );

remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');

function start_session() {
    if(!session_id()) {
    session_start();
    }
}

function theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'theme_setup');

// ACF
// if (function_exists('acf_add_options_page')) {
//   acf_add_options_page(['page_title' => 'Общее', 'menu_slug'  => 'theme-general-mail']);
// }

if (! current_user_can('manage_options')) {
  show_admin_bar(false);
}

// StructureMenu
// require_once __DIR__ . '/classes/StructureMenu.php';

// function register_my_menus() {
//   register_nav_menus(
//     array(
//       'headerMenu' => 'Меню в шапке',
//       // 'footerMenu' => 'Меню в футере',
//       // 'footerLinks' => 'Нижние ссылки в футере',
//     )
//   );
// }
// add_action('init', 'register_my_menus');

// if (function_exists('add_theme_support')) {
//   add_theme_support('menus');
// }

// Удалить атрибут sizes с img
add_filter('wp_get_attachment_image_attributes', 'remove_sizes_attribute', 10, 2);
function remove_sizes_attribute($attr, $attachment) {
    if (isset($attr['sizes'])) {
        unset($attr['sizes']);
    }
    return $attr;
}

add_action('wp_ajax_formatPhoneNumber', 'formatPhoneNumber');
add_action('wp_ajax_nopriv_formatPhoneNumber', 'formatPhoneNumber');
function formatPhoneNumber($phone) {
    // Remove all characters except digits and the plus sign
    $formattedNumber = preg_replace("/[^\d+]/", "", $phone);
    return $formattedNumber;
}

// Get Image
add_action('wp_ajax_get_image', 'get_image');
add_action('wp_ajax_nopriv_get_image', 'get_image');
function get_image($image, $class = '', $size = 'large', $loading = 'lazy', array $data = []) {
    if (empty($image)) {
        return;
    }

    // поддержка ACF: если вдруг пришёл массив
    if (is_array($image)) {
        $image_id = $image['ID'] ?? ($image['id'] ?? 0);
    } else {
        $image_id = (int) $image;
    }

    if (!$image_id) {
        return;
    }

    // берём вложение, чтобы сделать title
    $attachment = get_post($image_id);
    $title      = $attachment ? esc_attr($attachment->post_title) : '';

    // alt из меты
    $alt = get_post_meta($image_id, '_wp_attachment_image_alt', true);
    if (empty($alt)) {
        $alt = $title;
    }

    // базовые атрибуты
    $args = [
        'class'   => $class,
        'loading' => $loading,
        'title'   => $title,
        'alt'     => $alt,
    ];

    // дополнительные data-* атрибуты
    if (!empty($data)) {
        $args = array_merge($args, $data);
    }

    echo wp_get_attachment_image($image_id, $size, false, $args);
}

add_action('wp_ajax_get_short_text', 'get_short_text');
add_action('wp_ajax_nopriv_get_short_text', 'get_short_text');
function get_short_text($text, $maxchar = 140) {
  $text = strip_tags($text);
  if (iconv_strlen($text, 'utf-8') < $maxchar)
    return $text;
  $text = iconv_substr( $text, 0, $maxchar, 'utf-8' );
  $text = preg_replace('@(.*)\s[^\s]*$@s', '\\1 ...', $text);
    return $text;
}

add_action( 'admin_menu', 'remove_menus' );
function remove_menus() {
  remove_menu_page( 'edit.php' );
  remove_menu_page( 'edit-comments.php' );
}

require_once('includes/custom_post_types.php');
require_once('includes/disable_comments.php');
require_once('includes/mail.php');
require_once('includes/ajax.php');

remove_filter('the_content', 'wpautop');
remove_filter('the_excerpt', 'wpautop');