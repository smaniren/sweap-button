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
        wp_register_style( 'SWEAP-button-edit-css', get_theme_file_uri( '/static/sass/main.css'));
        wp_register_script( 'SWEAP-button', plugin_dir_url( __FILE__ ) . 'build/index.js', array('wp-blocks', 'wp-element','wp-editor') );
        register_block_type( 'sweap-button/sweap-button', array(
            'editor_script' => 'SWEAP-button',
            'editor_style' => 'SWEAP-button-edit-css',
            'render_callback' => array($this, 'theHTML')
            ));
    }
    function theHTML($attributes){
        if (!is_admin(  )){
            wp_enqueue_script('sweapButtonFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'), '1.0',true);
            wp_enqueue_style('zihma_main_styles',get_theme_file_uri( '/static/sass/main.css'));
        } 
        
        ob_start()?>
        <div data-sweap-button><pre style="display: none"><?php echo wp_json_encode( $attributes) ?></pre></div>
        <?php return ob_get_clean();
    }
}

$sweapButtonPlugin = new sweapButtonPlugin();
