<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class DatabaseTest extends TestCase
{

    use RefreshDatabase; // rafraichi la base à chaque instanciation

    public function testValidRegistration()
    {

        $count = User::count(); // on compte les enregistrement avant d'essayer un insert

        $response = $this->post('/register',[
            'email' => 'tota@machin.com',
            'name' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $newCount = User::count(); // on compte les enregistrement après essayer un insert
        $this->assertNotEquals($count,$newCount);
    }

}

