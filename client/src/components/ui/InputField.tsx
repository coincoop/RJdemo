import React, { useRef, useState } from 'react'
import style from '@/styles/ui/InputField.module.css'
import { icons } from '@/constants';

const InputField = ({
    type, name
}: {
    type: string
    name?: string
}) => {
    const MAX_IMAGES = 4;
    const isImgType = type === 'img';
    const isImgMoreType = type === 'img_more';
    const inputRef = useRef<HTMLInputElement>(null);
    const [imgUrls, setImgUrls] = useState<string[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            const names = Array.from(e.target.files).map(file => file.name);
            setImgUrls(urls);
            setFileNames(names);
        }
    };

    const handleImgClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleRemoveImg = (idx: number) => {
        setImgUrls(imgUrls.filter((_, i) => i !== idx));
        setFileNames(fileNames.filter((_, i) => i !== idx));
    };

    if (isImgType || isImgMoreType) {
        return (
            <div className={style['entry-area-file']}>
                <input
                    ref={inputRef}
                    className={style['input-field-file']}
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    multiple={isImgMoreType}
                    onChange={handleFileChange}
                />
                {imgUrls.length > 0 ? (
                    <div className={style['img-container']}>
                        {imgUrls.map((url, idx) => (
                            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                                <img
                                    src={url}
                                    alt={`preview-${idx}`}
                                    className={style['preview-img']}
                                    style={{ cursor: 'pointer', width: isImgMoreType ? '100%' : '100%', height: isImgMoreType ? 100 : '100%', objectFit: 'cover' }}
                                    onClick={handleImgClick}
                                />
                                <button
                                    className={style['btn-del']}
                                    type="button"
                                    onClick={e => { e.stopPropagation(); handleRemoveImg(idx); }}
                                ><img className={style['icon-del']} src={icons.remove.src} alt="" /></button>
                            </div>

                        ))}
                    </div>
                ) : (
                    <div
                        className={style['button-file']}
                        // style={{ cursor: 'pointer', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f2f2f2', borderRadius: 8 }}
                        onClick={handleImgClick}
                    >
                        Chọn ảnh
                    </div>
                )}
                {imgUrls.length > 0 && (
                    <div className={style['file-name']}>
                        {fileNames.join(', ')}
                    </div>
                )}
            </div>
        )
    }
    if (type === 'textarea') {
        return (
            <div className={style['entry-textarea']}>
                <textarea
                    className={style['textarea-field']}
                    name={name}
                    rows={6}
                    required
                />
                <div className={style['label-line-text']}>
                    <p>{name}</p>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className={style['entry-area']}>
                <input
                    className={style['input-field']}
                    type={type}
                    required
                />
                <div className={style['label-line']}>
                    <p>{name}</p>
                </div>
            </div>
        )
    }


}

export default InputField