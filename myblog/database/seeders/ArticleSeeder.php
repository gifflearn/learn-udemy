<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create(); //     Faker\Factory
        //dd($faker);

        for($i=0;$i < 26;$i++){

            Article::create([
                'title' => $faker->sentence($nbWords=6,$variableNbWords= true),
                'subtitle' => $faker->sentence($nbWords=6,$variableNbWords= true),
                'content' => $faker->text($maxNbChars = 600)
                ]);
        }
    }
}
