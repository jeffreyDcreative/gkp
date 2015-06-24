<?php
class Plugin_looper extends Plugin {
	var $meta = array(
	    'name'       => 'Looper',
	    'version'    => '1.0',
	    'author'     => 'Nick Snyder',
	    'author_url' => 'http://fasterhorses.co'
	);
	
	public function index() {	
		$count = $this->fetch_param('count', 5, 'is_numeric');
		echo str_repeat($this->content, $count);
	}
	
	public function lama() {
		echo '<iframe width="420" height="315" src="http://www.youtube.com/embed/X48G7Y0VWW4" frameborder="0" allowfullscreen></iframe>';
	}
	
}
