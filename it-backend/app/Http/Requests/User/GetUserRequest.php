<?php

namespace App\Http\Requests\User;

use App\Http\Responses\User\GetUserResponse;
use App\Models\User\User;
use Illuminate\Foundation\Http\FormRequest;

class GetUserRequest extends FormRequest
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
            //
        ];
    }

    public function perform()
    {
        $user_id = $this->route('id');
        $user = User::query()->find($user_id);
        if (!$user) {
            return response()->json('User not found', 404);
        }

        $user_formatted = GetUserResponse::from($user)->toArray();
        return response()->json($user_formatted, 200);
    }
}
