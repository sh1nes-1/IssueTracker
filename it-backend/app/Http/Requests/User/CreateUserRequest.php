<?php

namespace App\Http\Requests\User;

use App\Http\Responses\User\CreateUserResponse;
use App\Models\User\User;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'in:user,admin',
        ];
    }

    public function perform()
    {
        $user = User::query()->create($this->validated());
        $user_formatted = CreateUserResponse::from($user->refresh())->toArray();
        return response()->json($user_formatted, 201);
    }
}
