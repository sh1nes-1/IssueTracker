<?php

namespace App\Http\Requests\User;

use App\Http\Responses\User\GetAllUsersResponse;
use App\Models\User\User;
use Illuminate\Foundation\Http\FormRequest;

class GetAllUsersRequest extends FormRequest
{
    const USERS_PER_PAGE = 10;

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
        $users_q = User::query();
        $total = $users_q->count();

        $users_q->paginate(self::USERS_PER_PAGE);
        $users = $users_q->get();

        $users_formatted = GetAllUsersResponse::from($users, $total)->toArray();
        return response()->json($users_formatted, 200);
    }
}
