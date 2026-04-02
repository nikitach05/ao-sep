<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ao-sep' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'byAoRr?1|h`>zLePeBpD=jmB+$z;+_yH|rn!rZ1`>um+k6ZeQDIO-Zn4LBF*He>0' );
define( 'SECURE_AUTH_KEY',  '4F?~0h@2F?/jpi-T9Yv_>+^Qx)wb_na_~4T)Q)NXP(E)9.F~#4QcI%pEyt.p>N~X' );
define( 'LOGGED_IN_KEY',    'p9n4RR|BL4@[dfOK<BEo3JXEyCPCCV!z,t*JMH#>oj5L-,g cL%6B@.ZeePh{}5c' );
define( 'NONCE_KEY',        '/0UL_N@/_MGlWog+|WW-]PAIzonk6?2crzjV9%xz]08btLOR$$mJF=|~{sE>1+d_' );
define( 'AUTH_SALT',        'ShvJr|wYg_y04p,`7SG!gh^TrANhd]MLce ],[Ki~nD?`kK3:e,;0U6(_{&*{, s' );
define( 'SECURE_AUTH_SALT', 'e-#q1$A=W,0<Rd@y5Br?NZD|Apu$[Z6Ny}=h{fB:g=nf^mEFDS~aa8TPBBXx_wsD' );
define( 'LOGGED_IN_SALT',   ')*jg$Z#-=fb?~E_0WDbO(6]Rsp@J%vlFoGJigrIv&A),tnZMR:4x3RHJ.g}Rci8$' );
define( 'NONCE_SALT',       '[TaJ[v hYIZkKDZHvSDXrG36t3/Rbx4=ed*w9 M7ZJ^Hg=h?wM!Ru, r0Izjuxlq' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
