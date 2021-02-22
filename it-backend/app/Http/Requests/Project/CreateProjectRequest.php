<?php

namespace App\Http\Requests\Project;

use App\Http\Responses\Project\CreateProjectResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateProjectRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:32|unique:projects,name,NULL,id,user_id,'.Auth::id(),
        ];
    }

    public function perform()
    {
        $project = auth()->user()->projects()->create($this->validated());
        $project_formatted = CreateProjectResponse::from($project)->toArray();
        return response()->json($project_formatted, 201);
    }
}
