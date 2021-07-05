<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // D'où a vient ? Plus utilisé ?
        // return [
        //     //
        //     'name' => 'required|min:5|max:255',
        //     'email' => 'required|min:5|max:255|email'
        // ];
        return [
            'title' => 'required|min:6|max:150',
            'subtitle' => 'required|min:6|max:200',
            'content' => 'required'
        ];
    }

    /**
     * Get the messges to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => 'Le champ titre est requis',
            'title.min' => 'Le champ titre doit faire au moins 6 caractères',
            'title.max' => 'Le champ titre doit faire au plus 150 caractères',
            'subtitle.required' => 'Le champ sous-titre est requis',
            'subtitle.min' => 'Le champ sous-titre doit faire au moins 6 caractères',
            'subtitle.max' => 'Le champ sous-titre doit faire au plus 150 caractères',
            'content.required' => 'Le champ contenu est requis'
        ];
    }
}
