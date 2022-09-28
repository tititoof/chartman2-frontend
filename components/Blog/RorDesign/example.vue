<template>
  <section
    id="example"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <v-col
        class="primary text-center pa-5 white--text"
        cols="12"
        md="6"
      >
        <base-heading>
          Un exemple vaut mille mots
        </base-heading>

        <base-text class="mb-5 text-left">
          Imaginons que l'on veuille faire unsystème de messagerie interne à l'application.<br>
          On va vouloir que l'utilisateur n°1 puisse envoyer un message à l' utilisateur n°2.<br>
          Si l'utilisateur n°2 est connecté, il veut recevoir une notification (quand on lui envoi un message).<br>
          Je vais passer sur la création du modèle, etc...<br>
          De bons tutoriels sur Ruby on rails en français <a class="white--text" href="https://grafikart.fr/tutoriels/ruby-on-rails">grafikart</a><br>
          <code>app/models/message.rb</code>
          <pre class="py-0 my-0">
            <code v-highlight class="language-ruby blue-grey darken-1 light my-0 text-left py-0">
class Message &lt; ApplicationRecord
  # --- Relationships ---
  belongs_to :sender, class_name: 'User'
  belongs_to :recipient, class_name: 'User'

  # --- Validations ---
  # Sender
  validates_presence_of :sender, message: 'sender_required'

  # Sender
  validates_presence_of :recipient, message: 'recipient_required'

  # Body
  validates_length_of :body, within: 1..255, too_long: 'body_too_long', too_short: 'body_too_short'
end
            </code>
          </pre>
          <code>app/controllers/api/v1/message.rb</code>
          <pre>
            <code v-highlight class="language-ruby blue-grey darken-1 light my-0 text-left py-0">
module Api
  module V1
    # Messages management
    class MessagesController &lt; ApplicationController
      def create
        @object = Api::V1::Messages::CreateProcedure.call messages_params

        if @object[:success]
          render json: ArticleSerializer.new(@object[:payload])
        else
          render json: @object[:errors], status: :precondition_failed
        end
      end

      private

      def messages_params
        params.required(:messages).permit(:sender_id, :body, :receiver_id)
      end
    end
  end
end
            </code>
          </pre>
          <code>app/procedures/api/v1/messages/create_procedure.rb</code>
          <pre>
            <code v-highlight class="language-ruby blue-grey darken-1 light my-0 text-left py-0">
module Api
  module V1
    module Messages
      # Create a comment
      class CreateProcedure &lt; ApplicationCallable
        def initialize(options)
          @sender_id       = options[:sender_id]
          @body            = options[:body]
          @receiver_id     = options[:receiver_id]
        end

        def call
          message = Api::V1::Messages::CreateService.call(@sender_id, @body, @receiver_id)

          MessagesBroadcastJob.perform_now @receiver_id, message[:payload]

          { success: true, payload: message[:payload] }
        rescue StandardError => e
          { success: false, errors: e.message }
        end
      end
    end
  end
end
            </code>
          </pre>
          <code>app/services/api/v1/messages/create_service.rb</code>
          <pre>
            <code v-highlight class="language-ruby blue-grey darken-1 light my-0 text-left py-0">
module Api
  module V1
    module Messages
      # Create a message
      class CreateService &lt; ApplicationCallable
        def initialize(sender_id, body, receiver_id)
          @sender_id       = sender_id
          @body            = body
          @receiver_id     = receiver_id
        end

        def call
          message = Message.create!(sender: @sender_id, body: @body, receiver: @receiver_id)

          { success: true, payload: message }
        rescue ActiveRecord::RecordInvalid => invalid
          { success: false, errors: invalid.record.errors }
        end
      end
    end
  end
end
            </code>
          </pre>
          <code>app/jobs/messages_broadcast_job.rb</code>
          <pre>
            <code v-highlight class="language-ruby blue-grey darken-1 light my-0 text-left py-0">
# Send message to user
class MessagesBroadcastJob &lt; ApplicationJob
  queue_as :default

  def subscribed
    stream_from "current_user_#{current_user.id}"
  end

  def perform(receiver_id, message)
    ActionCable.server.broadcast "current_user_#{receiver_id}", {
      message: MessageSerializer.new(message)
    }
  end
end
            </code>
          </pre>
        </base-text>
      </v-col>

      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          class="grow hidden-sm-and-downpt-12"
          contain
          height="100vh"
          src="/images/my_ror_design.svg"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Example extends Vue {
}
</script>
