import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

function getR2Client() {
  const accountId = required("R2_ACCOUNT_ID");

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: required("R2_ACCESS_KEY_ID"),
      secretAccessKey: required("R2_SECRET_ACCESS_KEY")
    },
    // Cloudflare R2 funciona mejor así en muchos casos
    forcePathStyle: true
  });
}

export async function uploadToR2(args: {
  key: string;
  body: Buffer;
  contentType: string;
}) {
  const client = getR2Client();
  const bucket = required("R2_BUCKET");

  const cmd = new PutObjectCommand({
    Bucket: bucket,
    Key: args.key,
    Body: args.body,
    ContentType: args.contentType
  });

  await client.send(cmd);

  // No devolvemos URL pública (tu bucket debe seguir privado).
  return { bucket, key: args.key };
}