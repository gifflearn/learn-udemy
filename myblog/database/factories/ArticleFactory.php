<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'title' => $this->faker->sentence(),
            'subtitle' => $this->faker->sentence(),
            'content' => $this->faker->sentence()

            // 'title' => $faker->sentence($nbWords=6,$variableNbWords= true),
            //     'subtitle' => $faker->sentence($nbWords=6,$variableNbWords= true),
            //     'content' => $faker->text($maxNbChars = 600),
            //     'category_id' => Category::inRandomOrder()->first()->id


        ];
    }
}
