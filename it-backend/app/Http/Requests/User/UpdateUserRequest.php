<?php

namespace App\Http\Requests\User;

use App\Http\Responses\User\UpdateUserResponse;
use App\Models\User\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'email' => 'required|email|unique:users,email,'.$this->route('id'),
            'password' => 'required|min:6',
            'status' => 'in:active,disabled',
            'role' => 'in:user,admin',
        ];
    }

    public function perform()
    {
        $user_id = $this->route('id');
        $user = User::query()->find($user_id);
        if (!$user) {
            return response()->json('User not found', 422);
        }

        $attributes = $this->validated();

        if ($this->has('password')) {
            $attributes['password'] = bcrypt($this->get('password'));
        }

        $user->update($attributes);

        $user_formatted = UpdateUserResponse::from($user->refresh())->toArray();
        return response()->json($user_formatted, 200);
    }
}
