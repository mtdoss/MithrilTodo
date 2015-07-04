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

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def todo_params
    params.require(:todo).permit(:description, :done, :user_id)
  end
end
