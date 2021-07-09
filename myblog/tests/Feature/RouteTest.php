<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RouteTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testAccessAdminWithGuestRole()
    {
        $response = $this->get('/admin/articles');
        //$response->assertStatus(200);
        $response->assertRedirect('/login'); // On s'attend à être rediriger vers la page de login si on est pas connecté
    }

    public function testAccessAdminWithAdminRole()
	    {
	        $admin = Auth::loginUsingId(3); // methode quipermet de simuler l'authentification avec le user id=1
            $this->actingAs($admin);
            //dd($admin);
            $response = $this->get('/admin/articles');
            //dd($response);
	        $response->assertStatus(200);
	        //$response->assertRedirect('/login'); // On s'attend à être rediriger vers la page de login si on est pas connecté
	    }

}
