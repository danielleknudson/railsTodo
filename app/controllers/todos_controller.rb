class TodosController < ApplicationController

  def index
    @todos = Todo.all
  end

  def show
    @todo = Todo.find(params[:id])
  end

  def create
    @todo = Todo.new(params.permit(:content))
    if @todo.save 
      render :nothing => true, :status => 200
    else 
      render :nothing => true, :status => 500
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(content: params[:content], completed: params[:completed])
      render :nothing => true, :status => 200
    else 
      render :nothing => true, :status => 500
    end
  end

  def delete
    @todo = Todo.find(params[:id])
    @todo.destroy
  end

end
