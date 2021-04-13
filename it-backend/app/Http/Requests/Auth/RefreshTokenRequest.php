<?php

namespace App\Http\Requests\Auth;

use App\Http\Responses\Auth\RefreshTokenResponse;
use Illuminate\Foundation\Http\FormRequest;

class RefreshTokenRequest extends FormRequest
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
        $is_authorized = auth()->payload()->get('type') == 'refresh_token';

        if (!$is_authorized) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $access_token = auth()->refresh(true, true);
        $refresh_token = auth()->claims(['type' => 'refresh_token'])->setTTL(43200)->tokenById(auth()->user()->id);
        $response_formatted = RefreshTokenResponse::from($access_token, $refresh_token, auth()->user())->toArray();
        return response()->json($response_formatted, 200);
    }
}
