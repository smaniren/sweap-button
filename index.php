<?php

/* 
Plugin Name: sweap-button
Description: Fügt einen Button als Block hinzu
Version:1.0
Author: SWEAP
Author URI: https://sweap.ch
*/

if( ! defined( 'ABSPATH' ) ) exit;  // Exit if accessed directly


/* Hier kommt der eigentliche Inhalt rein */

class SweapButtonPlugin {
    /* __construct wird immer beim Initialisieren einer Klasse ausgeführt */
    function __construct(){
        add_action( 'init', array($this, 'adminAssets'));

    }

    function adminAssets(){
        wp_register_style( 'SWEAP-button-edit-css', plugin_dir_url( __FILE__ ) . 'build/index.css');
        wp_register_script( 'SWEAP-button', plugin_dir_url( __FILE__ ) . 'build/index.js', array('wp-blocks', 'wp-element','wp-editor') );
        register_block_type( 'sweap-button/sweap-button', array(
            'editor_script' => 'SWEAP-button',
            'editor_style' => 'SWEAP-button-edit-css',
            'render_callback' => array($this, 'theHTML')
            ));
    }
    function theHTML($attributes){
        ob_start() ?>
        <a href="<?php echo esc_html( $attributes['link'] ) ?>" class="<?php echo esc_html( $attributes['style'] ) ?>"><?php echo esc_html( $attributes['text'] ) ?></a>
        <?php return ob_get_clean();
    }
}

$sweapButtonPlugin = new sweapButtonPlugin();
