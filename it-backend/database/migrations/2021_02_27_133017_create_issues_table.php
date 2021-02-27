<?php


use App\Models\Issue\IssueLevel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_environment_id')->constrained();
            $table->foreignId('programming_language_id')->constrained();
            $table->string('short_id');
            $table->string('level')->default(IssueLevel::ERROR);
            $table->string('exception_name');
            $table->string('filename');
            $table->text('message');
            $table->boolean('is_resolved');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues');
    }
}
