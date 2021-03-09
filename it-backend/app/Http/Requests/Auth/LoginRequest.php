<?php

namespace App\Http\Requests\Auth;

use App\Http\Responses\Auth\LoginResponse;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
        $credentials = $this->only(['email', 'password']);

        if (!$access_token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        if ($user->status !== 'active') {
            return response()->json(['message' => 'Account is not active'], 401);
        }

        $refresh_token = auth()->claims(['type' => 'refresh_token'])->setTTL(43200)->tokenById($user->id);
        $response_formatted = LoginResponse::from($access_token, $refresh_token)->toArray();
        return response()->json($response_formatted, 200);
    }
}
