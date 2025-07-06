export async function askGemini(question){
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    const key = import.meta.env.VITE_GEMINI_API_KEY;

    console.log(key);

    const res = await fetch(`${url}?key=${key}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            contents:question.map(q=>({
                role:q.role === "user" ? "user" : "model",
                parts:[{text:q.content}]
            }))
        })
    });
    const data = await res.json();

    console.log("Gemini data ",data);
    return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Model did not respond as expected."
    );
}