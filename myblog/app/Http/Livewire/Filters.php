<?php

namespace App\Http\Livewire;

use App\Models\Article;
use Livewire\Component;

class Filters extends Component
{
    public $categories;
    public $activeFilters =[];
    public $afsearch='';

    public function render()
    {
        $this->activeFilters=array_filter($this->activeFilters, function($val) {  // Pour retirer les valeurs à false du tableau
            return $val !== false;
        });

        return view('livewire.filters',[
            'articles' =>(empty($this->activeFilters))
                            ? Article::all()
                            : Article::whereIn('category_id', array_keys($this->activeFilters))->get()
        ]);
        // return view('livewire.filters',[
        //     'articles' =>(empty($this->afsearch))
        //                     ? Article::all()
        //                     : Article::where('title','LIKE','%'.$this->afsearch.'%')->get()
        // ]);
    }
}
