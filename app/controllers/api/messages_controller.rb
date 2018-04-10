class Api::MessagesController < ApplicationController
  befoe_action :authenticate_user!

  def create
    MessageBus.publish "/chat_channel", { email: params[:email], body: params[:body] }
    #Can I add another channel right under this one?
    #How do I let a user create a channel?
  end
end
