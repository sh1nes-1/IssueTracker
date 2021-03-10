<?php

namespace App\Http\Requests\Auth;

use App\Http\Responses\User\GetUserResponse;
use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
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
        ];
    }

    public function perform()
    {
        $user = auth()->user();
        $user_formatted = GetUserResponse::from($user)->toArray();
        return response()->json($user_formatted, 200);
    }
}
