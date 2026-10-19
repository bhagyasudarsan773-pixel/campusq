import os
import sys
import json
from imagine import ChatMessage, ImagineClient

DEFAULT_PLAYGROUND_ENDPOINT = "https://aisuite.cirrascale.com/apis/v2"


def main():
    try:
        raw_input = sys.stdin.read()
        payload = json.loads(raw_input) if raw_input else {}

        api_key = (payload.get("apiKey") or "").strip()
        raw_endpoint = (payload.get("endpoint") or "").strip()
        model = (payload.get("model") or "Llama-3.1-8B").strip()
        messages_data = payload.get("messages") or [
            {"role": "user", "content": "Hello"}
        ]

        if not raw_endpoint or raw_endpoint.startswith("https://app.aihub.qualcomm.com"):
            endpoint = os.environ.get("IMAGINE_API_ENDPOINT", DEFAULT_PLAYGROUND_ENDPOINT)
        else:
            endpoint = raw_endpoint

        if api_key:
            os.environ["IMAGINE_API_KEY"] = api_key
            os.environ["QUALCOMM_API_KEY"] = api_key
        os.environ["IMAGINE_API_ENDPOINT"] = endpoint

        try:
            client = ImagineClient(api_key=api_key, endpoint=endpoint)
        except TypeError:
            client = ImagineClient()

        chat_messages = [
            ChatMessage(role=m.get("role", "user"), content=m.get("content", ""))
            for m in messages_data
        ]

        chat_response = client.chat(
            messages=chat_messages,
            model=model,
        )

        print(
            json.dumps(
                {
                    "ok": True,
                    "content": chat_response.first_content,
                    "model": model,
                }
            )
        )
    except Exception as exc:
        print(
            json.dumps(
                {
                    "ok": False,
                    "error": str(exc),
                }
            )
        )


if __name__ == "__main__":
    main()
