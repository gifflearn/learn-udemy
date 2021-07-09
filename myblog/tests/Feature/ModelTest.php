<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Factory;
use App\Models\User;

class ModelTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testValidRegistration()
    {
        $faker = Factory::create();
        $email = $faker->unique()->email;
        $count = User::count(); // on compte les enregistrement avant d'essayer un insert

        $response = $this->post('/register',[
            'email' => $email,
            'name' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $newCount = User::count(); // on compte les enregistrement après essayer un insert
        $this->assertNotEquals($count,$newCount);
    }

    public function testInvalidRegistration()
    {

        $response = $this->post('/register',[
            'email' => '',
            'name' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors(); // on teste qu'il y a bien des messages d'erreur
    }
}
