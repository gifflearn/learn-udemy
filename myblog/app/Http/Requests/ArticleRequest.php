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
        return [
            //
            'name' => 'required|min:5|max:255',
            'email' => 'required|min:5|max:255|email'
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
            'name.required' => 'Le champ name est requis',
            'email.required' => 'Le champ mail est requis',
            'email.email' => 'Le champ mail n\'est pas valide',
            'email.min' => 'Le champ mail doit faire 5 caractères'
        ];
    }
}
