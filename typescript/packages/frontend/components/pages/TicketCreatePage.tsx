import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-semantic-toasts";
import { Button, Divider, Form, Header, Message, Segment } from "semantic-ui-react";

import {
  useCreateTicketByExternalImageUrlMutation,
  useCreateTicketByUploadImageFileMutation,
  useGetTicketByExternalImageUrlLazyQuery,
} from "@/graphql/generated";

const RadioName = "imageType" as const;
type ImageType = "externalImageUrl" | "uploadImage";

export const TicketCreatePage: React.VFC = () => {
  const router = useRouter();
  const [getTicket, { data: getTicketData }] = useGetTicketByExternalImageUrlLazyQuery();
  const [createTicketByExternalImageUrl, { loading: createTicketLoading }] =
    useCreateTicketByExternalImageUrlMutation();
  const [createTicketByUploadImageFile, { loading: uploadImageLoading }] = useCreateTicketByUploadImageFileMutation();

  const [imageType, setImageType] = useState<ImageType>("externalImageUrl");
  const [externalImageUrl, setExternalImageUrl] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isImageValid, setIsImageValid] = useState(false);

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const alreadyExistTicketId = useMemo(
    () => getTicketData?.getTicketByExternalImageUrl?.id ?? null,
    [getTicketData?.getTicketByExternalImageUrl?.id],
  );

  const uploadImageUrl = useMemo(() => (uploadFile !== null ? URL.createObjectURL(uploadFile) : null), [uploadFile]);

  const isValid = useMemo(() => {
    if (imageType === "externalImageUrl") {
      return isImageValid && alreadyExistTicketId === null;
    }
    return isImageValid;
  }, [alreadyExistTicketId, imageType, isImageValid]);

  const loadImage = useCallback((imageUrl: string) => {
    return new Promise<boolean>((resolve, reject) => {
      const img = new Image();
      img.onerror = (e) => {
        reject(false);
      };
      img.onload = () => {
        resolve(true);
      };
      img.src = imageUrl;
    });
  }, []);

  const handleOnClickImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadFile(e.target.files?.[0] ?? null);
  }, []);

  const handleCreateTicket = useCallback(async () => {
    if (!isValid) {
      return;
    }
    if (imageType === "externalImageUrl") {
      const { data } = await createTicketByExternalImageUrl({
        variables: {
          externalImageUrl,
        },
      });
      if (data !== undefined && data !== null) {
        await router.push({
          pathname: "/ticket/detail/[id]",
          query: { id: data.createTicketByExternalImageUrl.id },
        });
        toast({
          type: "success",
          title: "画像を投稿しました！",
        });
      }
    }

    if (imageType === "uploadImage" && uploadFile !== null) {
      console.log(uploadFile);
      const { data } = await createTicketByUploadImageFile({
        variables: {
          file: uploadFile,
        },
      });
      if (data !== undefined && data !== null) {
        await router.push({
          pathname: "/ticket/detail/[id]",
          query: { id: data.createTicketByUploadImageFile.id },
        });
        toast({
          type: "success",
          title: "画像を投稿しました！",
        });
      }
    }
  }, [
    createTicketByExternalImageUrl,
    createTicketByUploadImageFile,
    externalImageUrl,
    imageType,
    isValid,
    router,
    uploadFile,
  ]);

  useEffect(() => {
    const checkValid = async () => {
      setIsImageValid(false);
      if (imageType === "externalImageUrl") {
        if (externalImageUrl === "") {
          return false;
        }
        const result = await loadImage(externalImageUrl);
        setIsImageValid(result);
        if (result) {
          getTicket({ variables: { externalImageUrl } });
        }
      }
      if (imageType === "uploadImage") {
        setIsImageValid(uploadFile !== null);
      }
    };

    checkValid();
  }, [externalImageUrl, getTicket, imageType, loadImage, uploadFile]);

  return (
    <>
      <Header content="画像を投稿しよう！" />
      <Segment>
        <Form>
          <Form.Field>
            <label
              css={css`
                padding-bottom: 12px;
              `}
            >
              画像の登録方法を選択してください
            </label>
            <Form.Radio
              label="URLを入力して画像を投稿"
              name={RadioName}
              value="externalImageUrl"
              checked={imageType === "externalImageUrl"}
              onChange={() => setImageType("externalImageUrl")}
            />
            <Form.Radio
              label="画像をアップロードして投稿"
              name={RadioName}
              value="uploadImage"
              checked={imageType === "uploadImage"}
              onChange={() => setImageType("uploadImage")}
            />
            <Divider />
            {imageType === "externalImageUrl" && (
              <>
                <label
                  css={css`
                    padding-bottom: 8px;
                  `}
                >
                  画像のURLを入力してください
                </label>
                <Form.Input
                  placeholder="例: https://example.jpg"
                  value={externalImageUrl}
                  onChange={(e) => setExternalImageUrl(e.target.value)}
                  error={isImageValid ? undefined : "画像のURLが正しくありません"}
                />
              </>
            )}

            {imageType === "uploadImage" && (
              <>
                <label
                  css={css`
                    padding-bottom: 8px;
                  `}
                >
                  下のボタンをクリックして画像をアップロードしてください
                </label>
                <Button
                  basic
                  icon="file image"
                  color="blue"
                  label={{ pointing: "left", content: "画像をアップロード", color: "blue" }}
                  onClick={() => imageUploadRef.current?.click()}
                />
                <input
                  ref={imageUploadRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  onChange={handleOnClickImageUpload}
                />
              </>
            )}
            <Divider />
            <label>画像プレビュー</label>
            {imageType === "externalImageUrl" && isImageValid && (
              <>
                {alreadyExistTicketId !== null && (
                  <Link href={`/ticket/detail/${alreadyExistTicketId}`} passHref>
                    <Message
                      warning
                      css={css`
                        &&& {
                          display: block !important;
                        }
                      `}
                    >
                      <Message.Header>この画像は登録済みです</Message.Header>
                      <Message.Content>ここをクリックしてこの画像の投稿に遷移できます</Message.Content>
                    </Message>
                  </Link>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={externalImageUrl}
                  alt={externalImageUrl}
                  css={css`
                    width: 100%;
                  `}
                />
              </>
            )}

            {imageType === "uploadImage" && uploadImageUrl !== null && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={uploadImageUrl}
                alt={uploadFile?.name ?? ""}
                css={css`
                  width: 100%;
                `}
              />
            )}
          </Form.Field>

          <Form.Button
            content="この画像の人物を募集する"
            color="blue"
            disabled={!isValid || createTicketLoading || uploadImageLoading}
            onClick={handleCreateTicket}
          />
        </Form>
      </Segment>
    </>
  );
};
