class TodosController < ApplicationController
  def create
    @todo = Todo.create(todo_params)
    render json: @todo
  end

  def index
    @todos = current_user.todos
    render json: @todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  private
  def todo_params
    params.require(:todo).permit(:description, :user_id)
  end
end
