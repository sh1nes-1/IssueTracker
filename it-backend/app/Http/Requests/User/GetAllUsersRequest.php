<?php

namespace App\Http\Requests\User;

use App\Http\Responses\User\GetAllUsersResponse;
use App\Models\User\User;
use Illuminate\Foundation\Http\FormRequest;

class GetAllUsersRequest extends FormRequest
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
        $users = User::query()->get();
        $users_formatted = GetAllUsersResponse::from($users)->toArray();
        return response()->json($users_formatted, 200);
    }
}
