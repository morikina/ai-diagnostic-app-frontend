import React, { useState } from "react";
import axios from "axios";

interface DiagnosisResult {
  recommendedLanguage: string;
  message: string;
  imageUrl: string;
}

const DiagnosisForm: React.FC = () => {
  // 状態管理（useState）
  const [experience, setExperience] = useState<string>(""); // 経験レベル
  const [purpose, setPurpose] = useState<string[]>([]); // 目的
  const [environment, setEnvironment] = useState<string>(""); // 環境
  const [learningStyle, setLearningStyle] = useState<string>(""); // 学習スタイル
  const [result, setResult] = useState<DiagnosisResult | null>(null); // 診断結果

  // 画像 URL のマップ（public フォルダ内の画像を指す）
  const imageUrls: { [key: string]: string } = {
    javascript: "/images/js.png",
    python: "/images/python.png",
    java: "/images/java.png",
    "c#": "/images/csharp.png",
    flutter: "/images/flutter.png",
    unity: "/images/unity.png",
    kotlin: "/images/kotlin.png",
    swift: "/images/swift.png",
    powershell: "/images/powershell.png",
    dart: "/images/dart.png",
    default: "/images/default.png",
  };

  // チェックボックスの変更ハンドラー
  const handlePurposeChange = (value: string) => {
    setPurpose((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      experience,
      purpose,
      environment,
      learningStyle,
    };

    try {
      console.log("送信データ:", data);

      // API リクエストを送信
      const response = await axios.post(
        "https://ai-diagnostic-app-backend.onrender.com/api/diagnose",
        data
      );
      const diagnosisResult = response.data;

      if (!diagnosisResult || !diagnosisResult.recommendedLanguage) {
        console.error("診断結果が正しくありません。");
        return;
      }

      // 正規表現でプログラミング言語を抽出
      const languageRegex =
        /(python|javascript|swift|kotlin|java|c#|flutter|unity|powershell|dart)/i;
      const match = diagnosisResult.recommendedLanguage.match(languageRegex);

      let normalizedLanguage = match ? match[0].toLowerCase() : "default";

      // 画像 URL の設定
      const imageUrl = imageUrls[normalizedLanguage] || imageUrls["default"];

      // 診断結果を状態に設定
      setResult({
        recommendedLanguage: diagnosisResult.recommendedLanguage,
        message: diagnosisResult.message,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">プログラム言語診断</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h4>経験レベル</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="experience"
                value="初心者"
                checked={experience === "初心者"}
                onChange={(e) => setExperience(e.target.value)}
              />
              <label className="form-check-label">初心者</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="experience"
                value="中級者"
                checked={experience === "中級者"}
                onChange={(e) => setExperience(e.target.value)}
              />
              <label className="form-check-label">中級者</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="experience"
                value="上級者"
                checked={experience === "上級者"}
                onChange={(e) => setExperience(e.target.value)}
              />
              <label className="form-check-label">上級者</label>
            </div>
          </div>

          <div className="form-group">
            <h4>目的</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Web開発"
                onChange={(e) => handlePurposeChange(e.target.value)}
              />
              <label className="form-check-label">Web開発</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="モバイルアプリ開発"
                onChange={(e) => handlePurposeChange(e.target.value)}
              />
              <label className="form-check-label">モバイルアプリ開発</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="ゲーム開発"
                onChange={(e) => handlePurposeChange(e.target.value)}
              />
              <label className="form-check-label">ゲーム開発</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="データサイエンス"
                onChange={(e) => handlePurposeChange(e.target.value)}
              />
              <label className="form-check-label">データサイエンス</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="インフラ"
                onChange={(e) => handlePurposeChange(e.target.value)}
              />
              <label className="form-check-label">インフラ</label>
            </div>
          </div>

          <div className="form-group">
            <h4>開発環境</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="environment"
                value="Windows"
                checked={environment === "Windows"}
                onChange={(e) => setEnvironment(e.target.value)}
              />
              <label className="form-check-label">Windows</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="environment"
                value="Mac"
                checked={environment === "Mac"}
                onChange={(e) => setEnvironment(e.target.value)}
              />
              <label className="form-check-label">Mac</label>
            </div>
          </div>

          <div className="form-group">
            <h4>学習方法</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="learningStyle"
                value="独学"
                checked={learningStyle === "独学"}
                onChange={(e) => setLearningStyle(e.target.value)}
              />
              <label className="form-check-label">独学</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="learningStyle"
                value="講座受講"
                checked={learningStyle === "講座受講"}
                onChange={(e) => setLearningStyle(e.target.value)}
              />
              <label className="form-check-label">講座受講</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="learningStyle"
                value="書籍"
                checked={learningStyle === "書籍"}
                onChange={(e) => setLearningStyle(e.target.value)}
              />
              <label className="form-check-label">書籍</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4">
            診断
          </button>
        </form>
      </div>

      {result && (
        <div className="card mt-5 shadow p-4 text-center">
          <h3 className="text-primary mb-3">診断結果</h3>
          <img
            src={result.imageUrl}
            alt={result.recommendedLanguage}
            className="img-fluid mb-3"
            style={{ maxWidth: "150px" }}
          />
          <p className="lead">{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosisForm;
